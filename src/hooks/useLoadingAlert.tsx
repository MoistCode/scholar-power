import { useIonLoading } from "@ionic/react";
import { useEffect, useRef } from "react";

const useLoadingAlert = (props: LoadingAlertProps) => {
  const {
    loading,
    message
  } = props;

  const [present, dismiss] = useIonLoading();
  const timer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (loading && !timer.current){
      timer.current = setTimeout(() => {
        present({
          message,
        });
      }, 250);
    }

    if (!loading && timer.current) {
      clearTimeout(timer.current);
      delete timer.current;
      dismiss();
    }

    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
        delete timer.current;
      }

      dismiss();
    }
  }, [dismiss, loading, message, present]);
};


export default useLoadingAlert;

type LoadingAlertProps = {
  loading: boolean;
  message: string;
}