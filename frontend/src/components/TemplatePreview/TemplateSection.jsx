import TemplatePreviewCard from "./TemplatePreviewCard";

const TEMPLATES = ["modern", "classic", "minimal-image"];

const TemplateSection = ({ onPreview }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-center text-black dark:text-white mb-8">
        Choose Your Template
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {TEMPLATES.map((id) => (
          <TemplatePreviewCard
            key={id}
            templateId={id}
            onPreview={onPreview}
          />
        ))}
      </div>
    </div>
  );
};

export default TemplateSection;