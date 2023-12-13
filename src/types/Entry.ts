import type { Emoji } from "@/types/Emoji";

export interface Entry {
    id: number;
    body: string;
    emoji: Emoji | null;
    createdAt: Date;
    userId: number;
}