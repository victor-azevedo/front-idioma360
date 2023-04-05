import OfferingsOpenOrClosed from "@/src/components/OfferingsOpenOrClosed";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";

const Page = () => {
  return <OfferingsOpenOrClosed status="open"></OfferingsOpenOrClosed>;
};
Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
