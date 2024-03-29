const ToggleBookmark = async (userId, lectureId, active, router) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API}/${
        active ? "unbookmark-lecture" : "bookmark-lecture"
      }`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          lectureId,
        }),
      }
    );
    router.refresh();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export { ToggleBookmark };
