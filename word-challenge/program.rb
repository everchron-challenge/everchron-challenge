class Program
  SEQUENCE_LENGTH = 4

  def initialize
    @lookup = {}
  end

  def read
    File.readlines('dictionary.txt').each { |line| parse(line.chomp) }
  end

  def write
    sequences = File.open('sequences.txt', 'w')
    words = File.open('words.txt', 'w')

    @lookup.inject([]) do |arr, (sequence, word)|
      if word
        sequences.puts(sequence)
        words.puts(word)
      end
    end

    sequences.close
    words.close
  end

  private

  def parse(word)
    sequences_in_word(word).each { |sequence| mark_sequence_in_program(sequence, word) }
  end

  def sequences_in_word(word)
    result = []
    word.each_char.with_index do |char, startindex|
      endindex = startindex + SEQUENCE_LENGTH - 1
      sequence = word[startindex..endindex]
      result.push(sequence) if sequence.length == SEQUENCE_LENGTH
    end
    result
  end

  def mark_sequence_in_program(sequence, word)
    @lookup[sequence] = @lookup.has_key?(sequence) ? false : word
  end
end

program = Program.new
program.read
program.write

puts "Done!"
