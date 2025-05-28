import BillingCycle from "./billingCycle.js";

export const getAll = async (req, res) => {
  try {
    const { page = 1, limit = 5 } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const billingCycles = await BillingCycle.find()
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });  // Opcional: ordenar por data de criação

    const total = await BillingCycle.countDocuments();

    res.json({
      data: billingCycles,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar ciclos de pagamento' });
  }
};

export async function create(req, res) {
  try {
    const newCycle = new BillingCycle(req.body);
    const savedCycle = await newCycle.save();
    res.status(201).json(savedCycle);
  } catch (err) {
    res.status(400).json({ error: 'Erro ao criar ciclo de cobrança.' });
  }
}

export async function update(req, res) {
  try {
    const updated = await BillingCycle.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ error: 'Registro não encontrado' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function remove(req, res) {
  try {
    const deleted = await BillingCycle.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Registro não encontrado' });
    res.json({ message: 'Removido com sucesso' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function getCount(req, res) {
  try {
    const count = await BillingCycle.countDocuments();
    res.status(200).json({ count });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao contar documentos.' });
  }
}

export async function getSummary(req, res) {
  try {
    const result = await BillingCycle.aggregate([
      {
        $project: {
          credit: { $sum: "$credits.value" },
          debt: { $sum: "$debts.value" }
        }
      },
      {
        $group: {
          _id: null,
          credit: { $sum: "$credit" },
          debt: { $sum: "$debt" }
        }
      },
      {
        $project: {
          _id: 0,
          credit: 1,
          debt: 1
        }
      }
    ]);

    const summary = result[0] || { credit: 0, debt: 0 };
    res.status(200).json(summary);

  } catch (err) {
    res.status(500).json({ error: 'Erro ao calcular o resumo financeiro.' });
  }
}