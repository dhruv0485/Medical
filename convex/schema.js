import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Define your Convex database schema here
  // This is a placeholder - you can add tables as needed
  
  // Example table for seizure entries
  seizures: defineTable({
    userId: v.string(),
    type: v.string(),
    date: v.string(),
    duration: v.number(),
    description: v.optional(v.string()),
    videoUri: v.optional(v.string()),
  }),
  
  // Example table for medications
  medications: defineTable({
    userId: v.string(),
    name: v.string(),
    dosage: v.string(),
    frequency: v.string(),
    times: v.array(v.string()),
  }),
});