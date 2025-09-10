import { useState } from "react";
import { useForm } from "react-hook-form";
import * as React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const applicationSchema = z.object({
  position: z.string().min(1, "Position is required"),
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(7, "Phone is required"),
  location: z.string().min(2, "Location is required"),
  experienceYears: z.string(),
  linkedin: z.string().url().or(z.literal("")).optional().default(""),
  portfolio: z.string().url().or(z.literal("")).optional().default(""),
  coverLetter: z.string().min(20, "Please add a brief cover letter"),
  expectedSalary: z.string().optional().default(""),
  noticePeriod: z.string().optional().default(""),
});

export type ApplicationInput = z.infer<typeof applicationSchema>;

interface ApplyFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultPosition?: string;
}

export default function ApplyForm({ open, onOpenChange, defaultPosition }: ApplyFormProps) {
  const { toast } = useToast();
  const [submitting, setSubmitting] = React.useState(false);

  const form = useForm<ApplicationInput>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      position: defaultPosition ?? "",
      fullName: "",
      email: "",
      phone: "",
      location: "",
      experienceYears: "",
      linkedin: "",
      portfolio: "",
      coverLetter: "",
      expectedSalary: "",
      noticePeriod: "",
    },
    values: undefined,
  });

  // Sync defaultPosition when job changes
  if (defaultPosition && form.getValues("position") !== defaultPosition) {
    form.setValue("position", defaultPosition);
  }

  const [resumeFile, setResumeFile] = useState<File | null>(null);

  const onSubmit = async (values: ApplicationInput) => {
    setSubmitting(true);
    try {
      // Build FormData to support optional resume file upload
      const fd = new FormData();
      Object.entries(values).forEach(([k, v]) => {
        if (v !== undefined && v !== null) fd.append(k, String(v));
      });
      if (resumeFile) {
        fd.append("resume", resumeFile, resumeFile.name);
      }

      const res = await fetch("/api/apply", {
        method: "POST",
        body: fd,
      });
      if (!res.ok) {
        let text = await res.text().catch(() => "");
        throw new Error(`Request failed: ${res.status} ${text}`);
      }
      toast({ title: "Application submitted", description: "We'll be in touch soon." });
      onOpenChange(false);
      setResumeFile(null);
      form.reset({
        position: defaultPosition ?? "",
        fullName: "",
        email: "",
        phone: "",
        location: "",
        experienceYears: "",
        linkedin: "",
        portfolio: "",
        coverLetter: "",
        expectedSalary: "",
        noticePeriod: "",
      });
    } catch (e: any) {
      toast({ title: "Submission failed", description: e?.message ?? "Please try again.", variant: "destructive" as any });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Apply for {defaultPosition ? defaultPosition : "a Position"}</DialogTitle>
          <DialogDescription>Fill in your details below. We\'ll review your application and reach out if there\'s a match.</DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="position">Position</Label>
              <Input id="position" placeholder="Role you\'re applying for" {...form.register("position")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="experienceYears">Experience</Label>
              <Select onValueChange={(v) => form.setValue("experienceYears", v)} value={form.watch("experienceYears")}> 
                <SelectTrigger>
                  <SelectValue placeholder="Years of experience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-1">0-1 years</SelectItem>
                  <SelectItem value="2-3">2-3 years</SelectItem>
                  <SelectItem value="4-6">4-6 years</SelectItem>
                  <SelectItem value="7-10">7-10 years</SelectItem>
                  <SelectItem value=">10">10+ years</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input id="fullName" placeholder="John Doe" {...form.register("fullName")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" {...form.register("email")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" placeholder="+1 555 123 4567" {...form.register("phone")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" placeholder="City, Country" {...form.register("location")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="linkedin">LinkedIn (optional)</Label>
              <Input id="linkedin" placeholder="https://linkedin.com/in/…" {...form.register("linkedin")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="portfolio">Portfolio / Resume Link (optional)</Label>
              <Input id="portfolio" placeholder="https://…" {...form.register("portfolio")} />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="coverLetter">Cover Letter</Label>
              <Textarea id="coverLetter" rows={6} placeholder="Tell us why you\'re a great fit…" {...form.register("coverLetter")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="resume">Upload Resume (PDF or DOCX)</Label>
              <input
                id="resume"
                type="file"
                accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                onChange={(e) => {
                  const f = e.target.files && e.target.files[0];
                  if (f) {
                    setResumeFile(f);
                  } else {
                    setResumeFile(null);
                  }
                }}
                className="block w-full text-sm text-muted-foreground"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="expectedSalary">Expected Salary (optional)</Label>
              <Input id="expectedSalary" placeholder="$120,000" {...form.register("expectedSalary")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="noticePeriod">Notice Period (optional)</Label>
              <Input id="noticePeriod" placeholder="2 weeks" {...form.register("noticePeriod")} />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit" disabled={submitting}>{submitting ? "Submitting…" : "Submit Application"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
