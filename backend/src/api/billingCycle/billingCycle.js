import mongoose from 'mongoose';

const creditSchema = new mongoose.Schema({
  name: { type: String, required: true },
  value: { type: Number, min: 0, required: true },
});

const debtSchema = new mongoose.Schema({
  name: { type: String, required: true },
  value: { type: Number, min: 0, required: true },
  status: { 
    type: String, 
    required: false, 
    uppercase: true,
    enum: ['PAGO', 'PENDENTE', 'AGENDADO'], 
  },
});

const billingCycleSchema = new mongoose.Schema({
    name: { type: String, required: true },
    date: { type: Date, required: true },
    credits: [creditSchema],
    debts: [debtSchema],
}, {
    timestamps: true  // Adiciona createdAt e updatedAt automaticamente
})

const BillingCycle = mongoose.model('BillingCycle', billingCycleSchema);

export default BillingCycle;