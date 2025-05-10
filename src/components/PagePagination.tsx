import { cn } from "@/lib/utils"
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "./ui/pagination"

const PagePagination = ({
    numOfPages, 
    handleSetPage, 
    page, 
    decreasePage, 
    increasePage}: {
        numOfPages: number, 
        handleSetPage: (val: number) => void, 
        page: number,
        decreasePage: () => void,
        increasePage: () => void
    }) => {
    const numbers = Array.from({length: numOfPages}, (_, i) => i + 1)
    const firstNumber = numbers[0]
    const lastNumber = numbers[numbers.length - 1]

    console.log(numbers)
    return (
        <Pagination className="my-6">
            <PaginationContent>
                <PaginationItem 
                className={cn("opacity-100", page === firstNumber && "pointer-events-none disabled opacity-50")}
                onClick={decreasePage}
                >
                    <PaginationPrevious href="#" />
                </PaginationItem>

                {numbers.map((num) => (
                    <PaginationItem key={num} onClick={() => handleSetPage(num)}>
                        {num === page ? 
                            <PaginationLink href="#" isActive>
                                {num}
                            </PaginationLink>
                            :
                            <PaginationLink href="#">{num}</PaginationLink>
                        }
                        
                    </PaginationItem>
                ))}


                <PaginationItem 
                className={cn("opacity-100", page === lastNumber && "pointer-events-none disabled opacity-50")}
                onClick={increasePage}
                >
                    <PaginationNext href="#" />
                </PaginationItem>

            </PaginationContent>
        </Pagination>
    )
}

export default PagePagination;