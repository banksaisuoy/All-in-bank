                    tx.type === 'credit' ? 'credit' : 'debit'
                  )}
                >
                  {tx.type === 'credit' ? '+' : '-'}${Math.abs(tx.amount).toFixed(2)}
                </td>
                <td>${(tx.balanceAfter || 0).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>