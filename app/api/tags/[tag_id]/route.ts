import { NextRequest, NextResponse } from 'next/server';
import { updateTagSchema } from '../_validators/update-tag.validator';
import { z } from 'zod';
import { updateTag } from '@/database/tags/tag.repository';

export async function PUT(request: NextRequest, { params }: { params: { tag_id: string } }) {
  try {
    const body = await request.json();
    const { name, color } = updateTagSchema.parse(body);
    const updatedTag = await updateTag(params.tag_id, {name, color});
    return NextResponse.json(updatedTag);
  } catch (schemaError) {
    console.error("Schema Validation Error:", schemaError);
    return NextResponse.json({ error: "Failed to update tags" }, { status: 500 });
  }
}