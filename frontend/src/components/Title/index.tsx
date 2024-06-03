interface TitleProps {
  title: string;
}

function Title({ title }: TitleProps) {
  return (
    <h1 className="display-4 fw-bold text-body-emphasis title-config">
      {title}
    </h1>
  );
}

export default Title;
