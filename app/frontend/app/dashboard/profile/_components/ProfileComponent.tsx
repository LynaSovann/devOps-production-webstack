"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload } from "lucide-react";
import { uploadProfileImage } from "@/service/profileImageService";
import { uploadProfileImageAction } from "@/action/profileImageAction";

export default function ProfileComponent({ data }: any) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [avatar, setAvatar] = useState(data?.profileImage || "");
  const [isSaving, setIsSaving] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setAvatar(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await uploadProfileImageAction(selectedFile);

      console.log("Upload success:", response);
      console.log("Saving avatar: ", avatar);
      setIsEditing(false);
    } finally {
      setIsSaving(false);
    }
  };
  return (
    <>
      <div className="grid grid-cols-1  gap-8">
        <div className="col-span-1">
          <Card className="border border-border bg-card sticky top-8">
            <CardContent className="pt-6 text-center">
              <>
                <div className="relative inline-block mb-4">
                  <img
                    src={avatar}
                    alt={data.user.username}
                    className="w-24 h-24 rounded-full mx-auto border-4 border-primary/20"
                  />
                  {isEditing && (
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute bottom-0 right-0 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full p-2 border-2 border-card transition-all"
                      title="Change avatar"
                    >
                      <Upload size={16} />
                    </button>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
                <h2 className="text-xl font-bold text-foreground">
                  {data.user.username}
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {data.user.email}
                </p>

                <Button
                  onClick={() => {
                    if (isEditing) {
                    }
                    setIsEditing(!isEditing);
                  }}
                  variant="outline"
                  className="border-border text-foreground hover:bg-muted my-12"
                >
                  {isEditing ? "Cancel" : "Edit"}
                </Button>

                {isEditing && (
                  <div className="flex gap-3 pt-4">
                    <Button
                      onClick={handleSave}
                      disabled={isSaving}
                      className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                      {isSaving ? "Saving..." : "Save Changes"}
                    </Button>
                  </div>
                )}
              </>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
