import { Card, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
  name: string;
  price: string;
  onClick?: () => void;
};

export function ComponentCard({ name, price, onClick }: Props) {
  <Card>
    <CardHeader className="miv-h-0 flex-1 pb-2">
      <CardTitle className="text-base font-medium leading-tight"></CardTitle>
    </CardHeader>
  </Card>;
}
