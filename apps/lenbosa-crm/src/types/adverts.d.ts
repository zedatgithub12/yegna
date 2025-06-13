interface AdvertFormValues {
  title: string;
  start_date: string;
  end_date: string;
  description: string;
  ad_banner: File | null;
}

interface AdvertProps {
  name: string;
  start_date: string;
  end_date: string;
  body: string;
  image: { url: string };
  is_active: boolean;
}
