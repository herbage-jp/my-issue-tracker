"use client";
import { Button, Callout, Text, TextField } from "@radix-ui/themes";
import "easymde/dist/easymde.min.css";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/app/validationSchemas";
import { z } from "zod";

type IssueForm = z.infer<typeof createIssueSchema>;

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

const NewIssuePage = () => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });
  const [error, setError] = useState<string>("");

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        onSubmit={handleSubmit(async (data) => {
          try {
            console.log(data);
            await axios.post("/api/issues", data);
            router.push("/issues");
          } catch (error) {
            console.error("Error submitting form:", error);
            setError("An unexpected error occurred. Please try again later.");
            // You could add error handling UI here
          }
        })}
        className="space-y-3"
      >
        <TextField.Root placeholder="Title" {...register("title")} />
        {errors.title && (
          <Text color="red" as="p">
            {errors.title.message}
          </Text>
        )}

        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        {errors.description && (
          <Text color="red" as="p">
            {errors.description.message}
          </Text>
        )}

        <Button>Submit New Issue</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
