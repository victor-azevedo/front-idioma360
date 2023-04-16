import useAsync from "@/src/hooks/useAsync";
import { resourcesApi } from "@/src/services/api/resources-api";

export default function useGetClasses() {
  const {
    data: classes,
    loading: getClassesLoading,
    error: getClassesError,
    act: getClasses,
  } = useAsync(() => resourcesApi.getAll({ resource: "classes" }));

  return {
    classes,
    getClassesLoading,
    getClassesError,
    getClasses,
  };
}
