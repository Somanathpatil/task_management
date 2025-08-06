import { NextResponse } from "next/server";
import connection from "@/app/libs/connection";
import task from "@/app/model/task";

export async function GET() {
  await connection();
  const tasks = await task.find().populate("agentId");
  return NextResponse.json(tasks);
}
