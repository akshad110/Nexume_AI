import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { resumeToPlainText, resumeToTextFile } from "@/lib/resumeToPlainText";
import { Download, Loader2 } from "lucide-react";
import PersonalDetailForm from "./forms/PersonalDetailForm";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import SummeryDetails from "./forms/SummeryDetails";
import ExperienceDetails from "./forms/ExperienceDetails";
import EducationDetails from "./forms/EducationDetails";
import SkillsDetails from "./forms/SkillsDetails";
import ProjectsDetails from "./forms/ProjectsDetails";
import CustomSectionsDetails from "./forms/CustomSectionsDetails";
import ThemePicker from "./ThemePicker";
import { ResumeInfoContext } from "@/context/ResumeContext";
import { getStepCount, getStepKey, getStepLabel, getTemplateMeta } from "@/data/resumeTemplates";
import { parseFormStep, canEnableNextForStep } from "@/lib/resumeFormSteps";

function FormSection({ onDownload, downloading = false }) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { resumeInfo } = useContext(ResumeInfoContext);
  const templateId = resumeInfo?.templateId;
  const stepCount = getStepCount(templateId);
  const activeFormIndex = parseFormStep(searchParams, templateId);
  const activeStepKey = getStepKey(templateId, activeFormIndex);
  const [enableNext, setEnableNext] = useState(false);

  const goToStep = (step) => {
    const nextStep = Math.min(Math.max(step, 1), stepCount);
    setSearchParams({ step: String(nextStep) }, { replace: true });
  };

  useEffect(() => {
    setEnableNext(canEnableNextForStep(activeFormIndex, resumeInfo, templateId));
  }, [activeFormIndex, resumeInfo, templateId]);

  if (!resumeInfo) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const renderStepForm = () => {
    switch (activeStepKey) {
      case "personal":
        return <PersonalDetailForm enableNext={(v) => setEnableNext(v)} />;
      case "summary":
        return <SummeryDetails enableNext={(v) => setEnableNext(v)} />;
      case "experience":
        return <ExperienceDetails enableNext={(v) => setEnableNext(v)} />;
      case "education":
        return <EducationDetails />;
      case "skills":
        return <SkillsDetails />;
      case "projects":
        return <ProjectsDetails />;
      case "customSections":
        return <CustomSectionsDetails />;
      default:
        return <PersonalDetailForm enableNext={(v) => setEnableNext(v)} />;
    }
  };

  return (
    <div>
      <p className="text-sm text-muted-foreground mt-2 mb-1">
        Template:{" "}
        <span className="font-medium text-foreground">
          {getTemplateMeta(templateId).name}
        </span>
        {" · "}
        Step {activeFormIndex} of {stepCount}:{" "}
        <span className="font-medium text-foreground">
          {getStepLabel(activeStepKey)}
        </span>
      </p>
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <ThemePicker />
        <div className="flex gap-2 flex-wrap">
          {onDownload && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="gap-2"
              disabled={downloading}
              onClick={onDownload}
            >
              {downloading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Download className="h-4 w-4" />
              )}
              Download PDF
            </Button>
          )}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              const text = resumeToPlainText(resumeInfo);
              const file = resumeToTextFile(
                resumeInfo,
                resumeInfo?.title || "resume",
              );
              navigate("/ats-checker", {
                state: { resumeFile: file, resumeText: text, fromBuilder: true },
              });
            }}
          >
            Check ATS score
          </Button>
          {activeFormIndex > 1 && (
            <Button size="sm" onClick={() => goToStep(activeFormIndex - 1)}>
              <ArrowLeft />
            </Button>
          )}
          {activeFormIndex < stepCount && (
            <Button
              disabled={!enableNext}
              className="flex gap-2"
              size="sm"
              onClick={() => goToStep(activeFormIndex + 1)}
            >
              Next <ArrowRight />
            </Button>
          )}
        </div>
      </div>

      {renderStepForm()}
    </div>
  );
}

export default FormSection;
