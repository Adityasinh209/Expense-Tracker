import { StackLayout, Label, TextField, Button } from '@nativescript/core';
import { useState } from 'react';
import { formatCurrency } from '../utils/formatters';

interface BalanceProps {
  opening: number;
  current: number;
  onUpdateOpeningBalance: (amount: number) => void;
}

export function Balance({ opening, current, onUpdateOpeningBalance }: BalanceProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [newBalance, setNewBalance] = useState(opening.toString());

  const handleSubmit = () => {
    const amount = parseFloat(newBalance);
    if (!isNaN(amount)) {
      onUpdateOpeningBalance(amount);
      setIsEditing(false);
    }
  };

  return (
    <StackLayout className="card">
      <StackLayout>
        <Label className="label-text" text="Opening Balance" />
        {isEditing ? (
          <StackLayout>
            <TextField
              className="input"
              keyboardType="number"
              text={newBalance}
              onTextChange={(args) => setNewBalance(args.value)}
            />
            <Button className="button" text="Save" onTap={handleSubmit} />
          </StackLayout>
        ) : (
          <StackLayout>
            <Label className="balance-text" text={formatCurrency(opening)} />
            <Button className="button" text="Edit" onTap={() => setIsEditing(true)} />
          </StackLayout>
        )}
      </StackLayout>

      <StackLayout>
        <Label className="label-text" text="Current Balance" />
        <Label className="balance-text" text={formatCurrency(current)} />
      </StackLayout>
    </StackLayout>
  );
}