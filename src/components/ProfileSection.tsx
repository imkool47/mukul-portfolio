import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  FileText,
  Code,
  FolderOpen,
  MessageSquare,
  Github,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import profileImage from "@/assets/mukul-profile.png";

const ProfileSection: React.FC = () => {
  const displayName = "Mukul";
  const email = "mukul.kumar630@gmail.com";
  const bio =
    "Full-stack developer with a passion for clean code and elegant solutions.";

  return (
    <div className="w-full max-w-4xl mx-auto py-8 px-4">
      {/* File path breadcrumb
      <div className="text-xs text-muted-foreground mb-4">
        portfolio / src / components / profile.md
      </div> */}

      {/* Main profile content */}
      <div className="space-y-10">
        {/* Header */}
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-mono">My Profile</h1>
        </div>

        <div className="flex flex-col md:flex-row gap-12 items-start">
          {/* Left - Avatar and Info */}
          <div className="flex flex-col items-center space-y-4 min-w-[240px]">
            <Avatar className="h-36 w-36 border-2 border-border">
              <AvatarImage src={profileImage} alt={displayName} />
              <AvatarFallback>{displayName.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <h2 className="text-3xl font-bold">{displayName}</h2>
            <p className="text-muted-foreground">{email}</p>
          </div>

          {/* Right - Bio and Developer Info */}
          <div className="flex-1 space-y-8">
            {/* About */}
            <div>
              <h3 className="text-xl font-mono font-semibold mb-2">About Me</h3>
              <p className="text-muted-foreground">{bio}</p>
            </div>

            <Separator />

            {/* Developer Info */}
            <div>
              <h3 className="text-xl font-mono font-semibold mb-4">
                Developer Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Skills */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Code size={20} className="text-yellow-400" />
                    <h4 className="font-semibold">Skills</h4>
                  </div>
                  <p className="text-sm">
                    View my complete skill set in the{" "}
                    <a
                      href="/?tab=skills"
                      className="text-pink-400 hover:underline"
                    >
                      Skills
                    </a>{" "}
                    section.
                  </p>
                </div>

                {/* Projects */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <FolderOpen size={20} className="text-blue-400" />
                    <h4 className="font-semibold">Projects</h4>
                  </div>
                  <p className="text-sm">
                    Check out my work in the{" "}
                    <a
                      href="/?tab=projects"
                      className="text-pink-400 hover:underline"
                    >
                      Projects
                    </a>{" "}
                    section.
                  </p>
                </div>

                {/* Contact */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <MessageSquare size={20} className="text-pink-400" />
                    <h4 className="font-semibold">Contact</h4>
                  </div>
                  <p className="text-sm">
                    Get in touch through the{" "}
                    <a
                      href="/?tab=contact"
                      className="text-pink-400 hover:underline"
                    >
                      Contact
                    </a>{" "}
                    section.
                  </p>
                </div>
              </div>
            </div>

            {/* GitHub */}
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-mono font-semibold">View Github → </h1>
              <a
                href="https://github.com/imkool47"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github size={22} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 flex justify-between text-xs px-4 py-1 bg-secondary border-t border-border">
        <div className="flex items-center gap-4">
          <span>main</span>
          <span>UTF-8</span>
          <span>Spaces: 2</span>
        </div>
        <div className="flex items-center gap-4">
          <span>2 pending tasks</span>
          <span>1 update available</span>
          <span>JavaScript</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
