export default function Policy({
  policy,
  activeItem,
  setActiveItem,
  pageURL,
  setHref,
}) {
  const url = `legal#${pageURL}?${policy.split("/").join("")}`;
  const handleSetPolicy = () => {
    setHref(url);
    setActiveItem(policy);
  };

  return (
    <div className="my-4">
      {activeItem === policy ? (
        <a
          href={url}
          className="font-semibold italic bg-jgo-primary text-jgo-white p-2 my-2"
          onClick={handleSetPolicy}
        >
          {policy}
        </a>
      ) : (
        <a
          href={url}
          className="font-semibold italic p-2 my-2"
          onClick={handleSetPolicy}
        >
          {policy}
        </a>
      )}
    </div>
  );
}
