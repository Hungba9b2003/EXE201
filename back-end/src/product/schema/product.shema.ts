import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import mongoose from 'mongoose';

@Schema()
export class Product extends Document {
  @Prop()
  name: string;

  @Prop({ type: [String], default: [] })
  images: string[];

  @Prop()
  description: string;

  @Prop()
  descriptionFull: string;

  @Prop()
  originalPrice: number;

  @Prop()
  salePrice: number;

  @Prop([{ size: String, quantity: Number }])
  sizes: { size: string; quantity: number }[];

  @Prop()
  material: string;

  @Prop()
  color: string;

  @Prop()
  pattern: string;

  @Prop()
  season: string;

  @Prop()
  waterResistance: string;

  @Prop()
  closureType: string;

  @Prop()
  stretch: string;

  @Prop({ type: Types.ObjectId })
  typeId: Types.ObjectId;

  @Prop({ type: String, enum: ['dog', 'cat', 'rabbit', 'bird', 'other'] })
  category: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
