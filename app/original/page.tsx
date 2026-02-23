import { promises as fs } from "fs";
import path from "path";
import AppShell from "@/components/app-shell";

export default async function OriginalHomePage() {
  const filePath = path.join(
    process.cwd(),
    "skills-instructions-contexts/FAI_final_drafts/Personal_History_Statement_Final.md"
  );
  let letterContent = "";

  try {
    letterContent = await fs.readFile(filePath, "utf8");
  } catch (error) {
    console.error("Error reading PHS file:", error);
    letterContent = "Error loading content. Please check the file path.";
  }

  return <AppShell letterContent={letterContent} />;
}
