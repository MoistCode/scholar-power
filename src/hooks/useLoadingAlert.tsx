import { useIonLoading } from "@ionic/react";
import { useEffect } from "react";

const useLoadingAlert = (props: LoadingAlertProps) => {
  const {
    loading,
    message
  } = props;

  const [present, dismiss] = useIonLoading();

  useEffect(() => {
    if (loading) {
      present({
        message,
      });
    }

    if (!loading) {
      dismiss();
    }
  }, [dismiss, loading, message, present]);
};

export default useLoadingAlert;

type LoadingAlertProps = {
  loading: boolean;
  message: string;
}