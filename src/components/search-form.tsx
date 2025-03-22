import { Search } from "lucide-react";
import { Input } from "./ui/input";

export function SearchForm({
  onSearch,
}: {
  onSearch: (query: string) => void;
}) {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value); // Chama a função onSearch a cada mudança no input
  };

  return (
    <form className="relative flex items-center mx-auto w-full lg:w-1/2 mt-10">
      <Input
        id="search"
        onChange={handleInputChange} // Atualiza a busca ao digitar
        placeholder="Pesquisar video"
        className="pl-10 pr-4 py-2 border rounded-md  mx-auto"
      />
      <div className="absolute left-2 top-1/2 -translate-y-1/2">
        <Search className="size-4 opacity-70" />
      </div>
    </form>
  );
}
