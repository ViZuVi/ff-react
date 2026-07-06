import NumberField from "@/shared/components/ui/Input/NumberField";
import type { CreateSpace } from "@/entities/space/model/types";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useState } from "react";

export const NoSpaces = () => {
  const [newSpace, setNewSpace] = useState({
    space_name: "",
    account_name: "Мой банковский счет",
    currency_id: 7,
    amount: 0,
  });

  const handleChange = <K extends keyof CreateSpace>(
    field: K,
    value: CreateSpace[K],
  ) => {
    console.log(field, value);

    setNewSpace((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="no-space">
      <div className="no-space__info">
        <p>У вас пока не создано ни одного пространства</p>
        <p>
          Чтобы создать свое первое пространство и начать работу заполните форму
          ниже
        </p>
      </div>
      <div className="no-space__form-wrapper">
        <div className="no-space__form">
          <TextField
            id="name"
            label="Название пространства"
            size="small"
            value={newSpace.space_name}
            onChange={(e) => handleChange("space_name", e.target.value)}
          />
          <TextField
            id="name"
            label="Название основного счета"
            size="small"
            value={newSpace.account_name}
            onChange={(e) => handleChange("account_name", e.target.value)}
          />
          <NumberField
            label="Сумма"
            value={Number(newSpace.amount)}
            size="small"
            min={1}
            onValueChange={(e) => handleChange("amount", e || 0)}
          />
          <FormControl size="small">
            <InputLabel id="currency">Валюта</InputLabel>
            <Select
              labelId="currency"
              id="currency"
              value={newSpace.currency_id}
              label="Валюта"
              onChange={(e) =>
                handleChange("currency_id", Number(e.target.value))
              }
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </div>
        <Button sx={{ m: "0 auto" }} variant="contained">
          Создать
        </Button>
      </div>
    </div>
  );
};
