import { useIonLoading } from "@ionic/react";
import { useEffect, useState } from "react";

const useLoadingAlert = (props: LoadingAlertProps) => {
  const {
    loading,
    message
  } = props;

  const [isPresenting, setIsPresenting] = useState(false);

  const [present, dismiss] = useIonLoading();

  useEffect(() => {
    if (loading && !isPresenting) {
      setIsPresenting(true);
      present({
        message,
      });
    }  
  }, [isPresenting, loading, message, present]);

  useEffect(() => {
    if (!loading && isPresenting) {
      setIsPresenting(false);
      dismiss();
    }
  }, [dismiss, isPresenting, loading])
};


export default useLoadingAlert;

type LoadingAlertProps = {
  loading: boolean;
  message: string;
}