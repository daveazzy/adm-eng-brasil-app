import { Speaker } from "../components/speaker-cards";

export function regexText(text: string): string {
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

export function getUniqueCategories(speakers: Speaker[]): string[] {
    const categories = speakers.map(speaker => speaker.categoryName || "Sem Categoria").filter(Boolean);
    return ["Todos", ...new Set(categories)];
}
