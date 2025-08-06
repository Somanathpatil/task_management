import { NextResponse } from "next/server";
import connection from "@/app/libs/connection";
import agent from "@/app/model/user";
import task from "@/app/model/task";
import * as XLSX from "xlsx";
import Papa from "papaparse";
import fs from "fs";
import path from "path";

export async function POST(req) {
  try {
    await connection();

    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const fileName = file.name.replace(/\s+/g, "_");
    const ext = path.extname(fileName).toLowerCase();

    if (![".csv", ".xlsx", ".xls"].includes(ext)) {
      return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
    }

    // Ensure uploads folder exists
    const uploadDir = path.resolve(process.cwd(), "uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Save file
    const tempPath = path.join(uploadDir, `${Date.now()}_${fileName}`);
    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(tempPath, buffer);

    // ✅ Check if file exists before reading
    if (!fs.existsSync(tempPath)) {
      throw new Error(`File was not saved: ${tempPath}`);
    }

    let records = [];

    if (ext === ".csv") {
  const fileData = fs.readFileSync(tempPath, "utf8");
  const result = Papa.parse(fileData, { header: true });
  records = result.data;
} else {
  console.log("Reading XLSX file:", tempPath);
  const buffer = fs.readFileSync(tempPath); // ✅ Read file as buffer
  const workbook = XLSX.read(buffer, { type: "buffer" }); // ✅ Parse from buffer
  const sheetName = workbook.SheetNames[0];
  records = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
}


    fs.unlinkSync(tempPath);

    const valid = records.every((r) => r.FirstName && r.Phone && r.Notes);
    if (!valid) {
      return NextResponse.json({ error: "Invalid file format" }, { status: 400 });
    }

    const agents = await agent.find();
    if (agents.length < 5) {
      return NextResponse.json({ error: "At least 5 agents required" }, { status: 400 });
    }

    const tasksPerAgent = Math.floor(records.length / 5);
    const remainder = records.length % 5;
    let index = 0;

    for (let i = 0; i < 5; i++) {
      const count = tasksPerAgent + (i < remainder ? 1 : 0);
      const agentTasks = records.slice(index, index + count);
      index += count;

      await task.create({
        agentId: agents[i]._id,
        tasks: agentTasks,
      });
    }

    return NextResponse.json({ message: "Tasks distributed successfully" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error", details: error.message }, { status: 500 });
  }
}
