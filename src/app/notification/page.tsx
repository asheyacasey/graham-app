'use client'
import NotificationList from "./components/NotificationList";
import React from 'react'
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Button from "@/ui/form/Button";
import Common from "@/templates/Common";
import BreadCrumbs from "@/ui/BreadCrumbs";
import { URLS } from "@/utils/URLS";
import { load_more_notifications_thunk } from "@/redux/slices/notifications";
import LoadingScreen from "@/ui/LoadingScreen";
import NotFoundScreen from "@/ui/NotFoundScreen.tsx";
const Notification = () => {
  const notificationState = useAppSelector((s) => s.notifications)
  const dispatch = useAppDispatch()
  const handleLoadMore = () => {
    try {
      dispatch(load_more_notifications_thunk({}))
    } catch (error) {
    }
  }

  return (
    <Common>
      <div className="px-30 pt-2 flex flex-col md:flex-row gap-5 items-center">
              <Button className="md:w-52">Notification</Button>
              <BreadCrumbs data={[{ title: "Home", route: URLS.HOME }, { title: "Notifications" }]} />
            </div>
      {
        notificationState.loading && (
          <LoadingScreen className="h-[400px]" />
        )
      }
      {
        !notificationState.loading && notificationState?.notifications?.length > 0 && (
          <div className="bg-[#F6F7FB] mb-12">
            <div>
              <NotificationList
                notifications={notificationState.notifications}
              />
              {
                notificationState.hasMore && (
                  <div className="flex items-center justify-center">
                    <Button onClick={handleLoadMore} className="mt-12 lg:w-[30%] bg-transparent text-black hover:text-white hover:bg-black transition">Load more</Button>
                  </div>
                )
              }
            </div>
          </div>
        )
      }
      {
        !notificationState.loading && notificationState.notifications.length===0 && (
          <NotFoundScreen className="h-[400px]" text="No notifications are available" />
        )
      }
    </Common>
  );
};

export default Notification;
