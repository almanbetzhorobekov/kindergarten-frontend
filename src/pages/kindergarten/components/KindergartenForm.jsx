import { useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import Button from "../../../components/Button";
import { fetchKindergartens, createKindergarten } from "../../../api/kindergartenService";

export default function KindergartenForm() {
  const queryClient = useQueryClient();
  //GET
  const { data: kindergartens = [], isLoading, error } = useQuery({
    queryKey: ["kindergartens"],
    queryFn: fetchKindergartens,
  });
  //POST
  const mutation = useMutation({
    mutationFn: createKindergarten,
    onSuccess: () => {
      // обновляем кеш, чтобы новые данные появились сразу
      queryClient.invalidateQueries(["kindergartens"]);
    },
  });

  const handleSubmit = (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);

  const newKindergarten = {
    kindergartenName: formData.get("kindergartenName"),
    address: {
      street: formData.get("street"),
      houseNumber: formData.get("houseNumber"),
      plz: formData.get("plz"),
    },
  };

  mutation.mutate(newKindergarten);
  event.target.reset();
};

  if (isLoading) return <p>Lädt...</p>;
  if (error) return <p>Fehler beim Laden der Kindergärten</p>;
  return (
    <section className="kindergartens">
      <h2 className="kindergartens-title">Neuen Kindergarten erstellen</h2>

      <form onSubmit={handleSubmit}>
        <input type="text" name="kindergartenName" placeholder="Kindergartenname" required />
        <fieldset>
          <input type="text" name="street" placeholder="Straße" required />
          <input type="text" name="houseNumber" placeholder="Hausnummer" required />
          <input type="text" name="plz" placeholder="PLZ" required />
        </fieldset>

        <Button type="submit">Erstellen</Button>
      
      </form>

      <div className="kindergartens-list">
        {kindergartens.map((kita, i) => (
          <div key={i} className="kita-card">
            <p>
              <strong>{kita.name}</strong> — {kita.street} {kita.strNumber}, {kita.plz}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
