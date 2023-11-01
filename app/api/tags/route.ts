import { prisma } from "@/lib/prisma/prisma";
import { Tag } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(req:Request){

    const { searchParams } = new URL(req.url);
    const name = searchParams.get("name");
   

    const tagFilter :Partial<Pick<Tag,"name">> = {}
    if(name){
        tagFilter.name = name;
    }
    const tags = await prisma.tag.findMany({
        where:{
            name:{
                contains:tagFilter.name
            }
        }
        
    })

    return NextResponse.json(tags,{status:200});
}