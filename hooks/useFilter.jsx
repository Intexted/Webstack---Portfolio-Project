import moment from "moment";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";

const useFilter = ({ List, user }) => {
  const pathname = usePathname();

  const searchParams = useSearchParams();
  const [FilterList, setFilterList] = useState();
  const [firstUpdate, setfirstUpdate] = useState(null);
  // const firstUpdate = useRef(true);
  useMemo(() => {
    const params = {};

    searchParams.forEach((v, k) => {
      params[k] = v === "true";
    });
    if (params["bookmarked"]) {
      document?.querySelector(".bookmark_userdb")?.classList?.add("active");
    } else {
      document?.querySelector(".bookmark_userdb")?.classList?.remove("active");
    }
    if (List && List?.length > 0) {
      try {
        setFilterList(
          List?.map((item) => {
            let minutes = moment(item?.endTime, "HH:mm").diff(
              moment(item?.startTime, "HH:mm"),
              "minutes"
            );
            let startHour = Number(
              moment(item?.startTime, "HH:mm").format("H")
            );

            return {
              ...item,
              workdays: new Date(item?.date).getDay() % 6 !== 0,
              weekends: new Date(item?.date).getDay() % 6 === 0,
              LR: item?.section?.includes("Logical Reasoning"),
              LG: item?.section?.includes("Logic Games"),
              RC: item?.section?.includes("Reading Comp"),
              general: item?.section?.includes("General"),
              admissions: item?.section?.includes("Admissions"),
              webinars_proBonos: item?.section?.includes(
                "Webinars & Pro Bonos"
              ),
              other: item?.section?.includes("None"),
              morning: startHour >= 8 && startHour < 12,
              afternoon: startHour >= 12 && startHour < 18,
              evening: startHour >= 18 && startHour < 24,
              beginner: item.level === 1,
              intermediate: item.level === 2,
              advanced: item.level === 3,
              hours_1_2: minutes < 120,
              hours_2_3: minutes >= 120 && minutes < 180,
              hours_3_5: minutes >= 180,
              bookmarked: user?.bookmarked.includes(item._id),
              watched: user?.watched.includes(item._id),
              unwatched: !user?.watched.includes(item._id),
            };
          })?.filter((c) =>
            Object.keys(params).every((k) => {
              try {
                return c[k] === params[k];
              } catch (error) {
                return false;
              }
            })
          )
        );
      } catch (error) {}
    } else {
      setFilterList(List);
    }
  }, [searchParams, List]);

  useEffect(() => {
    if (!firstUpdate) {
      setfirstUpdate(true);
      return;
    } else if (
      pathname.includes("lectures") &&
      window?.scrollY !== document.querySelector("#today")?.offsetTop - 250
    ) {
      window.scrollTo({
        top: document.querySelector("#today")?.offsetTop - 250,
        behavior: "smooth",
      });
    }
  }, [searchParams]);

  return { List: FilterList };
};

const useParamsFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const params = {};
  searchParams.forEach((v, k) => {
    params[k] = v === "true";
  });

  let dv = {
    workdays: true,
    weekends: true,
    LR: true,
    LG: true,
    RC: true,
    general: true,
    admissions: true,
    webinars_proBonos: true,
    other: true,
    morning: true,
    afternoon: true,
    evening: true,
    beginner: true,
    intermediate: true,
    hours_1_2: true,
    hours_2_3: true,
    hours_3_5: true,
    advanced: true,
    bookmarked: false,
    watched: false,
    unwatched: false,
  };

  const { register, watch, getValues, reset, setValue } = useForm({
    defaultValues: dv,
    values: { ...dv, ...params },
  });

  const object = watch();

  useEffect(() => {
    let url = "";
    Object.keys(object)?.map((key, i) => {
      if (key != "bookmarked" && key != "watched" && key != "unwatched") {
        url +=
          object[key] === false ? `${url ? "&" : ""}${key}=${object[key]}` : "";
      } else {
        url +=
          object[key] === true ? `${url ? "&" : ""}${key}=${object[key]}` : "";
      }
    });
    if (params != object)
      return router.replace(`/lectures?${url}`, { scroll: false });
  }, [object]);

  //   useEffect(() => {
  //     if (!loading) {
  //       setLoading(true);
  //       setTimeout(() => {
  //         setLoading(false);
  //       }, 500);
  //     }
  //   }, [object]);

  return { register, watch, getValues, reset, setValue, loading };
};

export { useFilter, useParamsFilter };
