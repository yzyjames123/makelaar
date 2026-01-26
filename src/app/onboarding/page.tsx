import { redirect } from "next/navigation";

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function OnboardingPage({ searchParams }: Props) {
  const params = await searchParams;
  const queryString = new URLSearchParams(
    Object.entries(params).reduce(
      (acc, [key, value]) => {
        if (value) {
          acc[key] = Array.isArray(value) ? value.join(",") : value;
        }
        return acc;
      },
      {} as Record<string, string>
    )
  ).toString();

  const target = queryString ? `/intake?${queryString}` : "/intake";
  redirect(target);
}
