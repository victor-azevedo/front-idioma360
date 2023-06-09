import { useRouter } from "next/router";
import { useEffect } from "react";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/app/courses");
  });
  return <></>;
};
Page.getLayout = (page) => (
  <DashboardLayout pageTitle="Home">{page}</DashboardLayout>
);

export default Page;
