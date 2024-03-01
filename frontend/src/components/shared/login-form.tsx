import { FormEvent, useState } from "react";
import { LoaderIcon } from "lucide-react";
import { LoginInputSchema } from "@/lib/validation";
import { ApiClient } from "@/lib/api";
import useTokenStore from "@/hooks/use-token-store";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Alert, AlertDescription } from "../ui/alert";

export default function LoginForm() {
  const [isInvalid, setIsInvalid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const initToken = useTokenStore(state => state.init);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    setIsInvalid(false);
    setIsLoading(true);
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = LoginInputSchema.parse({
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    });

    ApiClient.getInstance().login(data.email, data.password)
      .then((responseData) => {
        initToken(responseData);
      })
      .catch(() => {
        setIsInvalid(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Connexion</CardTitle>
        <CardDescription>Pour continuer, vous devez vous connecter</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            {isInvalid && <InvalidAlert />}
            <Input name="email" type="email" placeholder="Email" />
            <Input name="password" type="password" placeholder="Mot de passe" />
            <Button>{isLoading ? (<LoaderIcon className="w-4 h-4 animate-spin" />) : 'Se connecter'}</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

const InvalidAlert = () => {
  return (
    <Alert variant="destructive">
      <AlertDescription>
        Email ou mot de passe invalide.
      </AlertDescription>
    </Alert>
  );
}