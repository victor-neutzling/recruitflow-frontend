import { useQuery } from "@tanstack/react-query";
import { Input } from "../../components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";
import { useDebounce } from "@/hooks/use-debounce";
import { useApplicationRoutes } from "@/api/application/useApplication";
import { useNavigate } from "react-router";
import { Spinner } from "../../components/ui/spinner";
import { Typography } from "../../components/typography";
import { statusColorMap } from "@/utils/status-color-map";
import { mapStatusNames } from "@/utils/map-status-names";
import { useState } from "react";

export function Searchbar() {
  const navigate = useNavigate();
  const { getApplications } = useApplicationRoutes();

  const { search, setSearch, debouncedSearch } = useDebounce();
  const [open, setOpen] = useState(false);

  const applicationsQuery = useQuery({
    enabled: !!debouncedSearch,
    queryKey: ["get-applications-search", debouncedSearch],
    queryFn: () => getApplications({ search: debouncedSearch }),
  });
  return (
    <Popover open={open}>
      <PopoverTrigger>
        <Input
          placeholder="search..."
          type="search"
          className="w-100"
          value={search}
          onChange={(event) => {
            const value = event.target.value;
            setSearch(value);
            setOpen(value.length >= 3);
          }}
          onFocus={() => {
            if (search.length >= 3) setOpen(true);
          }}
          onBlur={() => {
            setOpen(false);
          }}
        />
      </PopoverTrigger>
      <PopoverContent
        className="mt-4 w-100 p-0 max-h-80 overflow-auto "
        onOpenAutoFocus={(e) => e.preventDefault()}
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        {!applicationsQuery.data || search.length < 3 ? (
          <div className="flex p-4 w-full justify-center">
            <Spinner />
          </div>
        ) : applicationsQuery.data!.total > 0 ? (
          Object.entries(applicationsQuery.data.applications).map(
            ([columnName, applications], mainIndex) =>
              applications.map((application, applicationIndex) => (
                <div
                  className={`flex items-center px-4 w-full h-14 justify-between cursor-pointer hover:bg-accent/5 ${mainIndex === 0 && applicationIndex === 0 ? "" : "border-t"}`}
                  onClick={() =>
                    navigate(`/application/view/${application.id}`)
                  }
                >
                  <div className="flex items-center">
                    <div
                      className={`w-1 h-8 mr-2 ${statusColorMap[columnName]} rounded-full`}
                    />
                    <div>
                      <Typography className="text-sm">
                        {application.title}
                      </Typography>
                      <Typography className="text-xs" variant="muted">
                        {application.position} @ {application.companyName}
                      </Typography>
                    </div>
                  </div>
                  <Typography variant="p" className="text-xs">
                    {mapStatusNames[columnName!]}
                  </Typography>
                </div>
              )),
          )
        ) : (
          <div className="flex p-4 w-full justify-center">
            <Typography variant="muted">No matches found.</Typography>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
