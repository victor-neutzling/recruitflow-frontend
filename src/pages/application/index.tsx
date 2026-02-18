import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Navbar } from "@/components/ui/navbar";
import PageBase from "@/components/ui/page-base";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useNavigate, useParams } from "react-router";
import { applicationFormSchema, type ApplicationFormData } from "./schema";
import { APPLICATION_FORM_INITIAL_VALUES } from "./constants";

export default function Application() {
  const { mode, id } = useParams<{
    mode: string;
    id: string | undefined;
  }>();
  const navigate = useNavigate();
  const form = useForm<ApplicationFormData>({
    mode: "onSubmit",
    resolver: zodResolver(applicationFormSchema),
    defaultValues: APPLICATION_FORM_INITIAL_VALUES,
  });

  return (
    <PageBase>
      <Navbar>
        <Input placeholder="search..." type="search" />
        <Button variant={"link"}>Statistics</Button>
        <Button variant={"link"}>List View</Button>
        <Button variant={"link"} onClick={() => navigate("/board")}>
          board
        </Button>
      </Navbar>
      <div className="mt-16"></div>
    </PageBase>
  );
}
