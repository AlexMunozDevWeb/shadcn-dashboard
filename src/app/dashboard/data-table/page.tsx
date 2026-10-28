import { payments } from "@/modules/data/payment";
import { columns } from "./columns";
import DataTable from "./data-table";

async function fetchData() {
  return payments;
}

export default async function Page() {
  const data = await fetchData();
  return (
    <div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
