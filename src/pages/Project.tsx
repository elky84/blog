import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

const Project = () => {
  const [markdownContent, setMarkdownContent] = useState("");

  useEffect(() => {
    fetch(process.env.PUBLIC_URL + "/project.md")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Markdown file not found");
        }
        return response.text();
      })
      .then((text) => setMarkdownContent(text))
      .catch((error) => console.error("Error loading markdown:", error));
  }, []);

  return (
    <div className="prose max-w-3xl mx-auto p-4">
      <ReactMarkdown>{markdownContent}</ReactMarkdown>
    </div>
  );
};

export default Project;
