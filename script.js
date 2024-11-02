document.addEventListener('DOMContentLoaded', () => {
    const customersPerPage = 3;
    let currentPage = 1;
const customerData = [
        { name: "Jane Cooper", company: "Microsoft", phone: "(225) 555-0118", email: "jane@microsoft.com", country: "United States", status: "active" },
        { name: "Floyd Miles", company: "Yahoo", phone: "(205) 555-0100", email: "floyd@yahoo.com", country: "Kiribati", status: "inactive" },
        { name: "Ronald Richards", company: "Adobe", phone: "(405) 555-0107", email: "ronald@adobe.com", country: "Israel", status: "inactive" },
        { name: "Marvin McKinney", company: "Tesla", phone: "(622) 555-0126", email: "marvin@tesla.com", country: "Iran", status: "active" },
        { name: "Jerome Bell", company: "Google", phone: "(622) 555-0129", email: "jerome@google.com", country: "Réunion", status: "active" },
        { name: "Kathryn Murphy", company: "Microsoft", phone: "(620) 555-0120", email: "kathryn@microsoft.com", country: "Curaçao", status: "active" },
        { name: "Jacob Jones", company: "Yahoo", phone: "(208) 555-0112", email: "jacob@yahoo.com", country: "Brazil", status: "active" },
        { name: "Kristin Watson", company: "Facebook", phone: "(704) 555-0127", email: "kristin@facebook.com", country: "Åland Islands", status: "inactive" }
    ];

    const tableBody = document.getElementById('customer-table-body');
    const paginationContainer = document.querySelector('.pagination');
    function renderTablePage(page) {
        tableBody.innerHTML = '';
        const start = (page - 1) * customersPerPage;
        const end = start + customersPerPage;
        const pageData = customerData.slice(start, end);

        pageData.forEach((customer, index) => {
            const row = document.createElement('tr');
            row.className = 'customer-table__row';

            row.innerHTML = `
                <td class="customer-table__cell">${customer.name}</td>
                <td class="customer-table__cell">${customer.company}</td>
                <td class="customer-table__cell">${customer.phone}</td>
                <td class="customer-table__cell">${customer.email}</td>
                <td class="customer-table__cell">${customer.country}</td>
                <td class="customer-table__cell">
                    <span class="status status--${customer.status}">${customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}</span>
                </td>
            `;
            setTimeout(() => {
                row.classList.add('customer-table__row--visible');
            }, index * 100);

            tableBody.appendChild(row);
        });
    }
    function renderPaginationButtons() {
        const totalPages = Math.ceil(customerData.length / customersPerPage);
        paginationContainer.innerHTML = '';

        for (let i = 1; i <= totalPages; i++) {
            const pageButton = document.createElement('span');
            pageButton.className = 'pagination__item';
            if (i === currentPage) pageButton.classList.add('pagination__item--active');
            pageButton.textContent = i;

            pageButton.addEventListener('click', () => {
                currentPage = i;
                renderTablePage(currentPage);
                renderPaginationButtons();
            });

            paginationContainer.appendChild(pageButton);
        }
    }
    renderTablePage(currentPage);
    renderPaginationButtons();
    const navLinks = document.querySelectorAll('.dashboard__nav-link');
    const sections = document.querySelectorAll('.content-section');

    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            navLinks.forEach(link => link.classList.remove('dashboard__nav-link--active'));
            
            link.classList.add('dashboard__nav-link--active');

            sections.forEach(section => section.style.display = 'none');
            
            const sectionId = link.getAttribute('data-section');
            document.getElementById(sectionId).style.display = 'block';
        });
    });
});