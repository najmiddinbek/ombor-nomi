// pages/api/topics.js
import connectMongoDB from "@/libs/mongodb";
import Topic from "@/models/topic";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { title, description, time, date, secondDate } = await request.json();
    await connectMongoDB();
    await Topic.create({ title, description, time, date, secondDate });
    return NextResponse.json({ message: "Topic Created" }, { status: 201 });
  } catch (error) {
    console.error("Error creating topic:", error);
    return NextResponse.json({ message: "Error creating topic" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectMongoDB();
    const topics = await Topic.find();
    return NextResponse.json({ topics });
  } catch (error) {
    console.error("Error fetching topics:", error);
    return NextResponse.json({ message: "Error fetching topics" }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const id = request.nextUrl.searchParams.get("id");
    await connectMongoDB();
    await Topic.findByIdAndDelete(id);
    return NextResponse.json({ message: "Topic deleted" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting topic:", error);
    return NextResponse.json({ message: "Error deleting topic" }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const id = request.nextUrl.searchParams.get("id");
    await connectMongoDB();
    const existingTopic = await Topic.findById(id);
    if (!existingTopic) {
      return NextResponse.json({ message: "Topic not found" }, { status: 404 });
    }
    existingTopic.isChecked = !existingTopic.isChecked;
    const updatedTopic = await existingTopic.save();
    return NextResponse.json({ message: "Topic updated", updatedTopic }, { status: 200 });
  } catch (error) {
    console.error("Error updating topic:", error);
    return NextResponse.json({ message: "Error updating topic" }, { status: 500 });
  }
}
