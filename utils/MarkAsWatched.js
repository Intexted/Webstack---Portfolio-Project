const MarkAsWatched = async (userId, lectureId, router) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API}/watched-lecture`,
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

export { MarkAsWatched };
