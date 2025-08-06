import connection from "@/app/libs/connection";
import agent from "@/app/model/user";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs'

export async function POST(request) {
    try{
            await connection();
            const {email, password, userName, countryCode, phoneNo} = await request.json();

              const fullPhone = `${countryCode}${phoneNo}`;

  // Validate using regex
  const phoneRegex = /^\+\d{1,3}\d{7,14}$/;
  if (!phoneRegex.test(fullPhone)) {
    return res.status(400).json({ error: "Invalid phone number format" });
  }
            const existing = await agent.findOne({
                $or: [{email}, {phoneNo:fullPhone}]
            })
            if(!existing){
                const hashPassword = await bcrypt.hash(password, 10);
                const newAgent = new agent({email, password:hashPassword, userName, phoneNo:fullPhone});
                await newAgent.save();
                return NextResponse.json({message:'Agent add Successfull', status:201});
            }else{
                return NextResponse.json({message:'Agent Allready Exist', status:204})
            }

    }catch(err){
        return NextResponse.json({message:'API Error', status:404})
    }
}