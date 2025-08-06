import connection from "@/app/libs/connection";
import agent from "@/app/model/user";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs'
import { genrateToken } from "@/app/libs/jwtToken";

export async function POST(request) {
    try {
        await connection();
        const { email, password } = await request.json();
        const exist = await agent.findOne({ email });
        if (!exist) {
            return NextResponse.json({ message: "User Not Found!", status: 404 });
        }

        const currect = await bcrypt.compare(password, exist.password);
        if (!currect) {
            return NextResponse.json({ message: 'Password is missmatch', status: 401 });
        }

        const token = genrateToken({ userId: exist._id, email: exist.email });
        const responce = NextResponse.json({ message: 'Login Successfull', token }, { status: 201 })

        responce.cookies.set('token', token, {
            httpOnly: true,
            secure: (process.env.NODE_ENV || '').trim() === "production",
            maxAge: 60 * 60,
            path: '/'
        })


        return responce;

    } catch (err) {
        return NextResponse.json({ message: 'API Problem', status: 404 });
    }

}