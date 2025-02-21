"use client";

import Loading from "@/components/Loading";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatPrice } from "@/lib/utils";
import { useGetTransactionsQuery } from "@/state/api";
import { useUser } from "@clerk/nextjs";
import React, { useState } from "react";

const TeacherBilling = () => {
  const [paymentType, setPaymentType] = useState("all");
  const { user, isLoaded } = useUser();
  const { data: transactions, isLoading: isLoadingTransactions } =
    useGetTransactionsQuery(user?.id || "", {
      skip: !isLoaded || !user,
    });

  const filteredData =
    transactions?.filter((transaction) => {
      const matchesTypes =
        paymentType === "all" || transaction.paymentProvider === paymentType;
      return matchesTypes;
    }) || [];

  if (!isLoaded) return <Loading />;
  if (!user) return <div>Por favor, faça login para acessar a página.</div>;

  return (
    <div className="billing bg-customgreys-primarybg p-6 rounded-xl border border-gray-800/50 shadow-lg">
      <div className="billing__container space-y-6">
        <h2 className="billing__title text-2xl font-semibold text-white">
          Histórico de Pagamento
        </h2>

        {/* Filtro de Tipo de Pagamento */}
        <div className="billing__filters">
          <Select value={paymentType} onValueChange={setPaymentType}>
            <SelectTrigger className="billing__select w-full sm:w-[180px] bg-customgreys-secondarybg border border-gray-800/50">
              <SelectValue placeholder="Filtrar por tipo" />
            </SelectTrigger>

            <SelectContent className="billing__select-content bg-customgreys-secondarybg border border-gray-800/50">
              <SelectItem
                className="billing__select-item hover:bg-purple-500/10 hover:text-white"
                value="all"
              >
                Todos os tipos
              </SelectItem>
              <SelectItem
                className="billing__select-item hover:bg-purple-500/10 hover:text-white"
                value="stripe"
              >
                Stripe
              </SelectItem>
              <SelectItem
                className="billing__select-item hover:bg-purple-500/10 hover:text-white"
                value="paypal"
              >
                Paypal
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Tabela de Transações */}
        <div className="billing__grid">
          {isLoadingTransactions ? (
            <Loading />
          ) : (
            <Table className="billing__table">
              <TableHeader className="billing__table-header bg-customgreys-darkGrey">
                <TableRow className="billing__table-header-row">
                  <TableHead className="billing__table-cell text-white">
                    Data
                  </TableHead>
                  <TableHead className="billing__table-cell text-white">
                    Valor
                  </TableHead>
                  <TableHead className="billing__table-cell text-white">
                    Método de Pagamento
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="billing__table-body bg-customgreys-primarybg">
                {filteredData.length > 0 ? (
                  filteredData.map((transaction) => (
                    <TableRow
                      className="billing__table-row hover:bg-customgreys-secondarybg/50 transition-colors"
                      key={transaction.transactionId}
                    >
                      <TableCell className="billing__table-cell text-gray-400">
                        {new Date(transaction.dateTime).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="billing__table-cell text-gray-400 font-medium">
                        {formatPrice(transaction.amount)}
                      </TableCell>
                      <TableCell className="billing__table-cell text-gray-400">
                        {transaction.paymentProvider}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow className="billing__table-row">
                    <TableCell
                      className="billing__table-cell text-gray-400 text-center py-8"
                      colSpan={3}
                    >
                      Nenhuma transação encontrada
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeacherBilling;
