type CategoriesLayoutProps = {
  children: React.ReactNode;
};

export default function CategoriesLayout({ children }: CategoriesLayoutProps) {
  return (
    <>
      <div>{children}</div>
    </>
  );
}
