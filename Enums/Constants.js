// Type of tickets
class TicketTypes 
{
    static Advice = Symbol("Advice")
    static PolicyQuestion = Symbol("Policy Question")
    static Document = Symbol("Document Question")
}

class TypeOfHelp
{
    static HumanResource = Symbol("Human Resources")
    static EHS = Symbol("Employee Health & Services")
}

class Environments
{
    static QA = Symbol("QA")
    static Alpha = Symbol("Alpha")
    static Prod = Symbol("Prod")
}

module.exports = {
    TicketTypes : TicketTypes, 
    TypeOfHelp : TypeOfHelp,
    Environments: Environments
}