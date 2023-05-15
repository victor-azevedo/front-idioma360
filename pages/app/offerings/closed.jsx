import OfferingsOpenOrClosed from "@/src/components/OfferingsOpenOrClosed";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";

const Page = () => {
  return <OfferingsOpenOrClosed status="closed"></OfferingsOpenOrClosed>;
};
Page.getLayout = (page) => (
  <DashboardLayout pageTitle="Seleções Encerradas">{page}</DashboardLayout>
);

export default Page;
