import { Button } from "@/components/ui/button";
import { Brain, LoaderCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  BtnBold,
  BtnBulletList,
  BtnClearFormatting,
  BtnItalic,
  BtnLink,
  BtnNumberedList,
  BtnRedo,
  BtnStrikeThrough,
  BtnStyles,
  BtnUnderline,
  BtnUndo,
  Editor,
  EditorProvider,
  HtmlButton,
  Separator,
  Toolbar,
} from "react-simple-wysiwyg";
import { toast } from "sonner";
import { generateAIContent } from "../../../../service/AIModal";

const EXPERIENCE_PROMPT = `You are an expert resume writer. For the position "{positionTitle}", write 5 to 7 achievement-focused resume bullet points.

Return valid JSON only, exactly this shape (no markdown):
{"html_format":"<ul><li>First bullet...</li><li>Second bullet...</li></ul>"}

Use only HTML <ul> and <li> tags inside html_format. No other keys.`;

function RichTextEditor({
  onRichTextEditorChange,
  index,
  defaultValue,
  positionTitle,
  label = "Work summary",
  enableAi = true,
}) {
  const [value, setValue] = useState(defaultValue ?? "");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setValue(defaultValue ?? "");
  }, [defaultValue, index]);

  const generateExperienceFromAI = async () => {
    const title = (positionTitle ?? "").trim();

    if (!title) {
      toast.error("Please add a Position Title first.");
      return;
    }

    if (!import.meta.env.VITE_GOOGLE_AI_API_KEY) {
      toast.error(
        "Google AI key is missing. Add VITE_GOOGLE_AI_API_KEY in .env.local or Render, then redeploy.",
      );
      return;
    }

    setLoading(true);

    try {
      const prompt = EXPERIENCE_PROMPT.replace("{positionTitle}", title);
      const parsed = await generateAIContent(prompt);

      const html =
        parsed?.html_format ??
        parsed?.html ??
        (typeof parsed === "string" ? parsed : null);

      if (!html || typeof html !== "string") {
        throw new Error("AI response did not include bullet points.");
      }

      setValue(html);
      onRichTextEditorChange(html);
      toast.success("Experience bullets generated.");
    } catch (err) {
      console.error("Generate experience AI error:", err);
      toast.error(
        err?.message ||
          "Failed to generate experience. Check your API key and try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between my-2">
        <label className="text-xs">{label}</label>
        {enableAi && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="flex gap-2 border-primary text-primary"
            onClick={generateExperienceFromAI}
            disabled={loading}
          >
            {loading ? (
              <LoaderCircle className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <Brain className="h-4 w-4" />
                Generate with AI
              </>
            )}
          </Button>
        )}
      </div>
      <EditorProvider>
        <Editor
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            onRichTextEditorChange(e.target.value);
          }}
        >
          <Toolbar>
            <BtnUndo />
            <BtnRedo />
            <Separator />
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnStrikeThrough />
            <Separator />
            <BtnNumberedList />
            <BtnBulletList />
            <Separator />
            <BtnLink />
            <BtnClearFormatting />
            <HtmlButton />
            <Separator />
            <BtnStyles />
          </Toolbar>
        </Editor>
      </EditorProvider>
    </div>
  );
}

export default RichTextEditor;
