import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Transaction, CreateTransactionData } from "@/store/slices/transactionSlice";

const categories = [
  "Food & Dining",
  "Transportation",
  "Shopping",
  "Entertainment",
  "Bills & Utilities",
  "Healthcare",
  "Income",
  "Other",
];

interface EditTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: Transaction | null;
  onSubmit: (data: Partial<CreateTransactionData>) => Promise<void>;
  isLoading?: boolean;
}

export const EditTransactionModal: React.FC<EditTransactionModalProps> = ({
  isOpen,
  onClose,
  transaction,
  onSubmit,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState<Partial<CreateTransactionData>>({
    description: '',
    amount: 0,
    type: 'expense',
    category: '',
    date: '',
    notes: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Populate form when transaction changes
  useEffect(() => {
    if (transaction) {
      setFormData({
        description: transaction.description,
        amount: Math.abs(transaction.amount), // Always show positive amount
        type: transaction.type,
        category: transaction.category,
        date: transaction.date.split('T')[0], // Format date for input
        notes: transaction.notes || '',
      });
      setErrors({});
    }
  }, [transaction]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.description?.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.amount || formData.amount <= 0) {
      newErrors.amount = 'Amount must be greater than 0';
    }

    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    if (!formData.date) {
      newErrors.date = 'Date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      // Convert amount to negative for expenses
      const submitData = {
        ...formData,
        amount: formData.type === 'expense' ? -Math.abs(formData.amount!) : Math.abs(formData.amount!),
      };

      await onSubmit(submitData);
      onClose();
    } catch (error) {
      console.error('Failed to update transaction:', error);
    }
  };

  const handleInputChange = (field: keyof CreateTransactionData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleClose = () => {
    setFormData({
      description: '',
      amount: 0,
      type: 'expense',
      category: '',
      date: '',
      notes: '',
    });
    setErrors({});
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Transaction</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Input
              id="description"
              placeholder="Enter transaction description"
              value={formData.description || ''}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className={errors.description ? 'border-red-500' : ''}
            />
            {errors.description && (
              <p className="text-sm text-red-500">{errors.description}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount *</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                min="0.01"
                placeholder="0.00"
                value={formData.amount || ''}
                onChange={(e) => handleInputChange('amount', parseFloat(e.target.value) || 0)}
                className={errors.amount ? 'border-red-500' : ''}
              />
              {errors.amount && (
                <p className="text-sm text-red-500">{errors.amount}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Type *</Label>
              <Select
                value={formData.type}
                onValueChange={(value: 'income' | 'expense') => handleInputChange('type', value)}
              >
                <SelectTrigger className={errors.type ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="income">Income</SelectItem>
                  <SelectItem value="expense">Expense</SelectItem>
                </SelectContent>
              </Select>
              {errors.type && (
                <p className="text-sm text-red-500">{errors.type}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => handleInputChange('category', value)}
              >
                <SelectTrigger className={errors.category ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.category && (
                <p className="text-sm text-red-500">{errors.category}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Date *</Label>
              <Input
                id="date"
                type="date"
                value={formData.date || ''}
                onChange={(e) => handleInputChange('date', e.target.value)}
                className={errors.date ? 'border-red-500' : ''}
              />
              {errors.date && (
                <p className="text-sm text-red-500">{errors.date}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              placeholder="Add any additional notes (optional)"
              value={formData.notes || ''}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              rows={3}
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? 'Updating...' : 'Update Transaction'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};