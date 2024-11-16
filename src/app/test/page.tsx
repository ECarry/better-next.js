import { auth } from "@/auth";

const testPage = async () => {
  const session = await auth();

  console.log(session);

  return <div>testPage</div>;
};

export default testPage;
